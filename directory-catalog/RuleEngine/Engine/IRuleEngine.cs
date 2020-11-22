using System.Threading.Tasks;

namespace RuleEngine
{
    /// <summary>
    /// IRuleEngine
    /// </summary>
    public interface IRuleEngine
    {
        /// <summary>
        /// Executes this instance.
        /// </summary>
        /// <returns>Task.</returns>
        Task Execute();
    }
}
