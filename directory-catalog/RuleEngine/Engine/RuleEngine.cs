using Rules.Enums;
using Rules.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.ComponentModel.Composition.Hosting;
using System.Linq;
using System.Threading.Tasks;

namespace RuleEngine
{
    /// <summary>
    /// RuleEngine
    /// </summary>
    /// <seealso cref="RuleEngine.IRuleEngine" />
    public class RuleEngine : IRuleEngine
    {
        [ImportMany]
        private List<Lazy<IRule, IRuleMetadata>> validationRules { get; set; }

        public RuleEngine()
        {
            // Use Directory catalogue to have get the validation rules.
            DirectoryCatalog catalog = new DirectoryCatalog(AppDomain.CurrentDomain.BaseDirectory, "Rules.dll");
            CompositionContainer container = new CompositionContainer(catalog);
            container.ComposeParts(this);
        }

        /// <summary>
        /// Executes this instance.
        /// </summary>
        /// <returns>
        /// Task.
        /// </returns>
        public async Task Execute()
        {
            if (validationRules != null && validationRules.Count > 0)
            {
                Console.WriteLine($"Total validation rule count {validationRules.Count}");

                Console.WriteLine($"Executing pre execution rules");
                await ExecuteRules(ExecutionMode.Pre).ConfigureAwait(false);

                Console.WriteLine("Executing Business Logic");

                await Task.Delay(500).ConfigureAwait(false);
                Console.WriteLine("**************************************");
                await Task.Delay(500).ConfigureAwait(false);

                Console.WriteLine("Completed Business Logic");

                Console.WriteLine($"Executing post execution rules");
                await ExecuteRules(ExecutionMode.Post).ConfigureAwait(false);
            }
            else
            {
                Console.WriteLine("No rules found to execute !!!");
            }
        }

        private async Task ExecuteRules(ExecutionMode executionMode)
        {
            // filter rules based on mode.
            var rules = validationRules.Where(rule => rule.Metadata.ExecutionMode == executionMode);

            if (rules != null)
            {
                Console.WriteLine($"Rule count {rules.ToList().Count}");

                // Ordering by Execution Priority
                rules = rules.OrderBy(lazy => lazy.Metadata.ExecutionPriority);

                foreach (var rule in rules)
                {
                    var result = await rule.Value.Validate(new Rules.Entities.RuleParams()).ConfigureAwait(false);
                    Console.WriteLine(result);
                }
            }
        }
    }
}
