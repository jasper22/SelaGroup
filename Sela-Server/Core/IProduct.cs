namespace Sela_Server.Core
{
    public interface IProduct
    {
        string Name { get; }

        int Id { get; }

        string Description { get; }
    }
}