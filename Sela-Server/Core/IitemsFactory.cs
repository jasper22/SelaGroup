namespace Sela_Server.Core
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IitemsFactory
    {
        Task<IEnumerable<IProduct>> GetProducts(int offset, string word);
    }
}