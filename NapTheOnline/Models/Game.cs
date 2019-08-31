using System;
using System.Collections.Generic;

namespace NapTheOnline.Models
{
    public partial class Game
    {
        public Game()
        {
            ImageGame = new HashSet<ImageGame>();
            Prices = new HashSet<Prices>();
        }

        public int Id { get; set; }
        public string Logo { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Banner { get; set; }

        public virtual ICollection<ImageGame> ImageGame { get; set; }
        public virtual ICollection<Prices> Prices { get; set; }
    }
}
