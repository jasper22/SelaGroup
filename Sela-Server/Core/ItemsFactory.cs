using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sela_Server.Core
{
    public class ItemsFactory : IitemsFactory
    {
        public Task<IEnumerable<IProduct>> GetProducts(int offset, string word)
        {
            if (string.IsNullOrEmpty(word))
            {
                return GetProducts(offset, (x) => true);
            }

            return GetProducts(offset, (x) => word.Equals(x.ToString(), StringComparison.OrdinalIgnoreCase));
        }

        private Task<IEnumerable<IProduct>> GetProducts(int offset, Predicate<bool> predicate)
        {
            TaskCompletionSource<IEnumerable<IProduct>> tcs = new TaskCompletionSource<IEnumerable<IProduct>>();

            var data = Enumerable.Range(offset, offset + 30)
                                 .Select(index => new Product(index));

            tcs.SetResult(data.ToArray());

            return tcs.Task;
        }
    }
}
