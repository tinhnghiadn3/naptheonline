using System;
namespace NapTheOnline.Models
{
    public class ListResult<T>
    {
        public T result { get; set; }

        public int total { get; set; }

        public ListResult(T result, int total)
        {
            this.result = result;
            this.total = total;
        }
    }
}
