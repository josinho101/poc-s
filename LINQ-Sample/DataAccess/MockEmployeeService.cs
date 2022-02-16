using DataAccess.Modals;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess
{
    public class MockEmployeeService : IEmployeeService
    {
        public IList<Employee> GetEmployees()
        {
            IList<Employee> list = new List<Employee>();
            list.Add(new Employee() { Id = 1, Name = "Theodora J Schweigert", Age = 27, Addresses = { "42 Oak Way" }, EmailAddresses = { "ramon1979@hotmail.com" } });
            list.Add(new Employee() { Id = 2, Name = "Queen S Almonte", Age = 51, Addresses = { "3580 Amethyst Drive" }, EmailAddresses = { "milan1982@yahoo.com" } });
            list.Add(new Employee() { Id = 3, Name = "Jo E Harding", Age = 28, Addresses = { "3450 James Avenue" }, EmailAddresses = { "kirstin.beah@yahoo.com" } });
            list.Add(new Employee() { Id = 4, Name = "Pat D Seibert", Age = 48, Addresses = { "4120 Ben Street" }, EmailAddresses = { "piper_beatt9@hotmail.com" } });
            list.Add(new Employee() { Id = 5, Name = "Evelyn J Bass", Age = 63, Addresses = { "3316 Walnut Street" }, EmailAddresses = { "iac1990@hotmail.com" } });

            return list;
        }
    }
}
