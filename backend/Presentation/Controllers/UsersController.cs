using Contracts;
using Microsoft.AspNetCore.Mvc;
using Services.Abstractions;

namespace Presentation.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly IServiceManager _serviceManager;
    public UsersController(IServiceManager serviceManager) => _serviceManager = serviceManager;

    [HttpGet]
    public async Task<IActionResult> GetAllUsers(){
        var usersDto = await _serviceManager.UserService.GetAllAsync();
        return Ok(usersDto);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetUserById(Guid id){
        var userDto = await _serviceManager.UserService.GetById(id);

        return Ok(userDto);
    }

    [HttpPost("login")]
    public async Task<IActionResult> UserLogin(UserLoginDto loginDto){
        var token = await _serviceManager.UserService.Login(loginDto);

        return Ok(new {token = token});
    }

    [HttpPost("register")]
    public async Task<IActionResult> UserRegister(UserCreateDto user){
        var newUser = await _serviceManager.UserService.Register(user);

        return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, newUser);
    }

    [HttpGet("verify/{verificationToken:guid}")]
    public async Task<IActionResult> UserVerify(Guid verificationToken){
        var verifyInfo = await _serviceManager.UserService.Verify(verificationToken);
        var title = verifyInfo.Success ? "Success!" : "Failed!";

        return Content($"<html><h1>{title}</h1><p>{verifyInfo.Message}</p></html>", "text/html");
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateUser(Guid id, UserCreateDto user){
        var updatedUser = await _serviceManager.UserService.Update(id, user);

        return Ok(updatedUser);
    }
}
