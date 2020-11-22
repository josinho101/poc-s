using Rules.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Rules.Interfaces
{
    /// <summary>
    /// IRule
    /// </summary>
    public interface IRule
    {
        /// <summary>
        /// Validates the specified rule parameters.
        /// </summary>
        /// <param name="ruleParams">The rule parameters.</param>
        /// <returns>true if success.</returns>
        Task<bool> Validate(RuleParams ruleParams);
    }
}
