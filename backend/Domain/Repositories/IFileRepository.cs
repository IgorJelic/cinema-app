using Microsoft.AspNetCore.Http;

namespace Domain.Repositories;

public interface IFileRepository
{
    Task UploadFile(IFormFile file, string path);
    Task RemoveFile(string path);
}
