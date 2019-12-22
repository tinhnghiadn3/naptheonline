namespace NapTheOnline.ViewModels
{
    public class ListResultViewModel<T>
    {
        public T result { get; set; }

        public int total { get; set; }

        public ListResultViewModel(T result, int total)
        {
            this.result = result;
            this.total = total;
        }
    }
}
