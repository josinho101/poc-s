using Rules.Enums;

namespace Rules.Interfaces
{
    /// <summary>
    /// IRuleMetadata.
    /// </summary>
    public interface IRuleMetadata
    {
        /// <summary>
        /// Gets the execution priority.
        /// </summary>
        int ExecutionPriority { get; }

        /// <summary>
        /// Gets the mode.
        /// </summary>
        /// <value>
        /// The mode.
        /// </value>
        ExecutionMode ExecutionMode { get; }
    }
}
