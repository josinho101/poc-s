using DataAccess;
using DataAccess.Modals;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MyApp
{
    internal class Program
    {
        static void Main(string[] args)
        {
            IEmployeeService employeeService = new MockEmployeeService();
            IList<Employee> employees = employeeService.GetEmployees();

            Console.WriteLine("All Employees");
            foreach (Employee employee in employees)
            {
                Console.WriteLine($"Id: {employee.Id}, Name: {employee.Name}, Age: {employee.Age}");
            }
            Console.WriteLine("*****************************");

            Console.WriteLine("Employess having age greater than 35");
            var filteredEmployees = employees.Where(e => e.Age > 35);
            foreach (Employee employee in filteredEmployees)
            {
                Console.WriteLine($"Id: {employee.Id}, Name: {employee.Name}, Age: {employee.Age}");
            }
            Console.WriteLine("*****************************");

            Console.WriteLine("Max age from employee list");
            var MaxAge = employees.Max(e => e.Age);
            Console.WriteLine($"Max age - {MaxAge}");
            Console.WriteLine("*****************************");


            Console.WriteLine("Employees between age 35 and 50 and ordered by name");
            var filtered = from e in employees
                           where e.Age >= 35 && e.Age <= 55
                           orderby e.Name ascending
                           select e;
            foreach (Employee employee in filtered)
            {
                Console.WriteLine($"Id: {employee.Id}, Name: {employee.Name}, Age: {employee.Age}");
            }
            Console.WriteLine("*****************************");

        }
    }
}