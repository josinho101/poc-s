using dot.net_core.Models;
using dot.net_core.Settings;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace dot.net_core.Services
{
    public class CandidatesService
    {
        private readonly IMongoCollection<Candidate> candidates;

        public CandidatesService(ICandidatesRepositorySettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            candidates = database.GetCollection<Candidate>(settings.CollectionName);
        }

        public async Task<List<Candidate>> GetAll()
        {
            var data = await candidates.FindAsync(e => true).ConfigureAwait(false);
            return data.ToList();
        }
    }
}
