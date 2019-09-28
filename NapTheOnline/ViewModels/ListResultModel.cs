namespace NapTheOnline.ViewModels
{
    public class ListResultModel<T>
    {
        public T Result { get; set; }

        public int Total { get; set; }

        public ListResultModel(T result, int total)
        {
            Result = result;
            Total = total;
        }
    }
}
