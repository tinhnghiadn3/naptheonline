using System;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace NapTheOnline.Helper
{
    public class FileUpload
    {
        public string UploadImage(IFormFile file, string fileName)
        {
            if (file.Length > 0)
            {
                Random random = new Random();
                fileName += DateTime.Now.ToString("yyyy_MM_dd_hh_mm_ss") + random.Next(0, 100).ToString() + ".jpg";
                var folderPath = Path.Combine("Uploads", "Images", fileName);
                using (var stream = new FileStream(folderPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                return "images/" + fileName;
            }

            return string.Empty;
        }

        public bool DeleteImage(string dirPath)
        {
            if (!String.IsNullOrEmpty(dirPath) && dirPath.Split('/').Length == 4)
            {
                dirPath = Path.Combine("Uploads", "Images", dirPath.Split('/')[3]);
                try
                {
                    if (File.Exists(dirPath))
                        File.Delete(dirPath);
                    return true;
                }
                catch (Exception ex)
                {
                    throw new ApplicationException(ex.Message);
                }
            }

            return false;
        }
    }
}