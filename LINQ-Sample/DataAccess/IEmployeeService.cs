using System;
using System.Collections.Generic;
using System.Text;
using DataAccess.Modals;

namespace DataAccess
{
    public interface IEmployeeService
    {
        IList<Employee> GetEmployees();
    }
}
