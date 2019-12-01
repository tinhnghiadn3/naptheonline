using Microsoft.AspNetCore.Mvc;
using NapTheOnline.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NapTheOnline.Controllers
{
    [Route("api/[controller]")]
    public class BackupController : Controller
    {
        GoogleDriveAPI googleDriveAPI = new GoogleDriveAPI();

        [HttpGet("upload")]
        public bool BackupData()
        {
            googleDriveAPI.BackupFile();
            return true;
        }

        [HttpGet("restore")]
        public bool RestoreData()
        {
            googleDriveAPI.RestoreFile();
            return true;
        }
    }
}
