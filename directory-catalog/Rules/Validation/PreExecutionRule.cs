using Rules.Entities;
using Rules.Enums;
using Rules.Interfaces;
using System.ComponentModel.Composition;
using System.Threading.Tasks;

namespace Rules.Validation
{
    /// <summary>
    /// PreValidationRule.
    /// Export metadata provided to have priority of 100.
    /// Any other rule which requires to be executed before should have lower value as priority
    /// </summary>
    /// <seealso cref="Rules.Interfaces.IRule" />
    [Export(typeof(IRule))]
    [ExportMetadata("ExecutionPriority", 100)]
    [ExportMetadata("ExecutionMode", ExecutionMode.Pre)]
    public class PreExecutionRule : IRule
    {
        /// <summary>
        /// Validates the specified rule parameters.
        /// </summary>
        /// <param name="ruleParams">The rule parameters.</param>
        /// <returns>
        /// true if success.
        /// </returns>
        public Task<bool> Validate(RuleParams ruleParams)
        {
            return Task.FromResult(true);
        }
    }
}
