using System;
using System.Collections.Generic;

namespace NapTheOnline.Models
{
    public partial class ImageGame
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DirPath { get; set; }
        public int? GameId { get; set; }

        public virtual Game Game { get; set; }
    }
}
