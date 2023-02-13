using System.ComponentModel.DataAnnotations;

namespace Contracts.CustomValidation;

[AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
public class UserLoginDtoValidation : ValidationAttribute
{
    public UserLoginDtoValidation()
    {
        
    }

    public string GetErrorMessage() => $"User must have username OR email.";

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is UserLoginDto)
        {
            // Mislio sam da cu imati i polje Email pa sam hteo verifikujem da li je bar jedno od ta dva NENULL
            if (String.IsNullOrWhiteSpace(((UserLoginDto)value).Username))
            {
                return new ValidationResult(GetErrorMessage());
            }
            else{
                return ValidationResult.Success;
            }
        }
        
        return ValidationResult.Success;
    }
}
