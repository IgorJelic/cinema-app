using Contracts;
using Services.Abstractions;
using Domain.Repositories;
using Mapster;
using Domain.Exceptions.User;
using Domain.Entities;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Domain.EmailService;
using Microsoft.Extensions.Options;

namespace Services;

public sealed class UserService : IUserService
{
    private readonly IRepositoryManager _repositoryManager;
    private readonly IEmailService _emailService;

    public UserService(IRepositoryManager repositoryManeger, IEmailService emailService){
         _repositoryManager = repositoryManeger;
         _emailService = emailService;
    } 
    public async Task<IEnumerable<UserDto>> GetAllAsync()
    {
        var users = await _repositoryManager.UserRepository.GetAllAsync();
        var usersDto = users.Adapt<IEnumerable<UserDto>>();
        return usersDto;
    }

    public async Task<UserDto> GetById(Guid id)
    {
        var user = await _repositoryManager.UserRepository.GetById(id);
        if(user is null){
            throw new UserNotFoundException(id);
        }
        var userDto = user.Adapt<UserDto>();
        return userDto;
    }

    public async Task<User> GetByIdRaw(Guid id)
    {
        var user = await _repositoryManager.UserRepository.GetById(id);
        if(user is null){
            throw new UserNotFoundException(id);
        }
        return user;
    }

    public async Task<string> Login(UserLoginDto userLogin)
    {
        var user = await _repositoryManager.UserRepository.GetLoginUser(userLogin);
        if(user is null){
            throw new UserLoginNotFoundException(userLogin);
        }

        if(BCrypt.Net.BCrypt.Verify(userLogin.Password, user.Password)){
            if(!user.Verified){
                throw new UserLoginNotVerifiedException(user.Username);
            }

            List<Claim> userClaims = new List<Claim>();

            userClaims.Add(new Claim("id", user.Id.ToString()));
            userClaims.Add(new Claim("role", user.Role.ToString()));
            userClaims.Add(new Claim("name", user.Name));
            // userClaims.Add(new Claim("email", user.Email));

            if(user.Role == Contracts.Enums.Role.admin){
                userClaims.Add(new Claim(ClaimTypes.Role, "admin"));
            }
            else if(user.Role == Contracts.Enums.Role.customer){
                userClaims.Add(new Claim(ClaimTypes.Role, "customer"));
            }

            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("secretKey_mySecret_k3Y"));
            var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                issuer: "https://localhost:5001/", // url servera koji je izdao token
                claims: userClaims,
                expires: DateTime.Now.AddMinutes(20),
                signingCredentials: signingCredentials
            );

            string tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return tokenString;
        }
        else{
            throw new UserLoginFailedException();
        }
    }

    public async Task<UserDto> Register(UserCreateDto user)
    {
        Guid verificationToken = Guid.NewGuid();

        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        var newUser = user.Adapt<User>();
        newUser.VerificationToken = verificationToken;
        newUser.VerificationTokenExpireDate = DateTime.Now.AddMinutes(15);
        
        _repositoryManager.UserRepository.Insert(newUser);
        await _repositoryManager.UnitOfWork.SaveChangesAsync();

        string message;
        var verifyUrl = $"https://localhost:5001/api/users/verify/{verificationToken}";
            message = $@"<p>Please click the below link to verify your email address:</p>
                            <p><a href=""{verifyUrl}"">{verifyUrl}</a></p>";

        var body = $"<h4>Verify Email</h4><p>Thanks for registering!</p>{message}";

        _emailService.Send(newUser.Email, "Sign-up Verification API - Verify Email", body);

        return newUser.Adapt<UserDto>();
    }

    public async Task<UserVerifyInfo> Verify(Guid verificationToken)
    {
        var user = await _repositoryManager.UserRepository.GetByVerificationToken(verificationToken);
        if(user is null){
            throw new UserVerifyNotFoundException(verificationToken);
        }

        if(user.Verified){
            return new UserVerifyInfo(){Success = false, Message = $"User '{user.Username}' already verified!"};
        }

        if(user.VerificationTokenExpireDate < DateTime.Now){
            _repositoryManager.UserRepository.Remove(user);
            await _repositoryManager.UnitOfWork.SaveChangesAsync();

            return new UserVerifyInfo(){Success = false, Message = $"Verification token expired! Register again."};
        }

        user.Verified = true;

        await _repositoryManager.UnitOfWork.SaveChangesAsync();
        return new UserVerifyInfo(){ Success = true, Message = $"User '{user.Username}' successfully verified!" };
    }

    public async Task<UserDto> Update(Guid id, UserCreateDto newUser)
    {
        var user = await _repositoryManager.UserRepository.GetById(id);
        if(user is null){
            throw new UserNotFoundException(id);
        }

        // KRIPTUJ
        user.Password = newUser.Password;

        await _repositoryManager.UnitOfWork.SaveChangesAsync();
        return user.Adapt<UserDto>();
    }

    
}
