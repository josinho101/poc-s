namespace dot.net_core.Settings
{
    public class CandidatesRepositorySettings : ICandidatesRepositorySettings
    {
        public string CollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface ICandidatesRepositorySettings
    {
        string CollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
