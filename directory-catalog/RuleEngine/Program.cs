using System;

namespace RuleEngine
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("------------- Executing rule engine -------------");

            IRuleEngine engine = new RuleEngine();
            engine.Execute();

            Console.ReadLine();
        }
    }
}
