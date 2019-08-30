using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace NapTheOnline.Helper
{
    public class FileUploads
    {
        public string UploadImage(IFormFile file, string fileName)
        {
            if (file.Length > 0)
            {
                Random random = new Random();
                fileName += DateTime.Now.ToString("yyyy_MM_dd_hh_mm_ss") + random.Next(0, 100).ToString() + ".jpg";
                var folderPath = Path.Combine("ClientApp", "src", "assets", "uploads", fileName);
                using (var stream = new FileStream(folderPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                return "../../assets/uploads/" + fileName;
            }
            return null;
        }
        public bool DeleteImage(string dirPath)
        {
            if (!String.IsNullOrEmpty(dirPath) && dirPath.Split('/').Length == 4)
            {
                dirPath = Path.Combine("ClientApp", "src", "assets", "uploads", dirPath.Split('/')[4]);
                try
                {
                    if (File.Exists(dirPath))
                        File.Delete(dirPath);
                    return true;
                }
                catch { }
            }
            return false;
        }
    }
}
