using Domain.Exceptions.File;
using Domain.Repositories;
using Microsoft.AspNetCore.Http;

namespace Persistence.Repositories;

public class FileRepository : IFileRepository
{
    public async Task RemoveFile(string path)
    {
        if(File.Exists(path))
        {
            File.Delete(path);
        }
        else{
            throw new PathDoesNotExistException(path);
        }
    }

    public async Task UploadFile(IFormFile file, string path)
    {
        using(Stream fileStream = new FileStream(path, FileMode.OpenOrCreate)){
            await file.CopyToAsync(fileStream);
        }
    }
}
