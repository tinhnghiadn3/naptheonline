using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace NapTheOnline.Controllers
{
    public class BaseController : Controller
    {
        private IHostingEnvironment _env;

        public BaseController(IHostingEnvironment env)
        {
            _env = env;
        }

        public void AddFolderStoringImage()
        {
            try
            {
                var webRoot = _env.WebRootPath;
                var imagesPath = Path.Combine(webRoot, "Content");


                if (!Directory.Exists(imagesPath))
                {
                    // Try to create the directory.
                    Directory.CreateDirectory(imagesPath);
                }
            }
            catch (Exception)
            {
                //
            }
        }
    }
}
