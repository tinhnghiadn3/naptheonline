using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NapTheOnline.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NapTheOnline.Controllers
{
    [Route("api/[controller]")]
    public class BackupController : Controller
    {
        GoogleDriveAPI googleDriveAPI = new GoogleDriveAPI();

        [HttpGet("BackupData")]
        public string BackupData()
        {
            googleDriveAPI.BackupFile();
            return "backup done";
        }

        [HttpGet("RestoreData")]
        public string RestoreData()
        {
            googleDriveAPI.RestoreFile();
            return "restore done";
        }
    }
}
