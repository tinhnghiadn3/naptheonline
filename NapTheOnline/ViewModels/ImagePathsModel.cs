using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NapTheOnline.ViewModels
{
    public class ImagePathsModel
    {
        public string PathLogo { get; set; }
        public string PathBanner { get; set; }
        public List<string> PathDescription { get; set; }

        public ImagePathsModel()
        {
            PathDescription = new List<string>();
        }
    }
}
