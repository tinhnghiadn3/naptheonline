using System;
using System.Collections.Generic;

namespace NapTheOnline.Models
{
    public partial class Prices
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal? Value { get; set; }
        public int? GameId { get; set; }

        public virtual Game Game { get; set; }
    }
}
