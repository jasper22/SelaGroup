namespace Sela_Server.Core
{
    using System;


    public class Product : IProduct
    {
        public Product(int id) : this (id, Guid.NewGuid().ToString(), Guid.NewGuid().ToString())
        {

        }

        public Product(int id, string name, string description)
        {
            this.Id = id;
            this.Name = name;
            this.Description = description;
        }

        public string Name
        {
            get;
            private set;
        }

        public int Id
        {
            get;
            private set;
        }

        public string Description
        {
            get;
            private set;
        }
    }
}
