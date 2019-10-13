using System;
namespace NapTheOnline.Models
{
    public class ListResult<T>
    {
        public T Result { get; set; }

        public int Total { get; set; }

        public ListResult(T result, int total)
        {
            Result = result;
            Total = total;
        }
    }
}
