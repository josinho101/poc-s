using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Modals
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public List<string> Addresses { get; set; }
        public List<string> EmailAddresses { get; set; }

        public Employee()
        {
            this.Addresses = new List<string>();
            this.EmailAddresses = new List<string>();
        }
    }
}
