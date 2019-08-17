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
            try
            {
                //var file = Request.Form.Files[0];
                var folderPath = Path.Combine("ClientApp", "src", "assets", "uploads");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderPath);
                if (file.Length > 0)
                {
                    Random random = new Random();
                    fileName += DateTime.Now.ToString("yyyy_MM_dd_hh_mm_ss") + random.Next(0, 1000).ToString() + ".jpg";
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderPath, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return fullPath;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
