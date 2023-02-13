using System.IdentityModel.Tokens.Jwt;
using Services.Abstractions;

namespace Web.Middleware;

public class JwtMiddleware : IMiddleware
{
    // private readonly RequestDelegate _next;
    private readonly IUserService _userService;
    public JwtMiddleware(IServiceManager serviceManager){
        _userService = serviceManager.UserService;
    }

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        string token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        if (!String.IsNullOrEmpty(token)){
            var tokenHandler = new JwtSecurityTokenHandler();
            JwtSecurityToken jwtToken = tokenHandler.ReadJwtToken(token);

            var userId = Guid.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);

            context.Items["User"] = await _userService.GetByIdRaw(userId);
        }

        await next(context);
    }
}
