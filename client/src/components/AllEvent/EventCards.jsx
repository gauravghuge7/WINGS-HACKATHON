import React from 'react';

const OpportunityCard = ({ title, description, icon, actionLabel, actionLink }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4 text-4xl text-indigo-600">
        {icon}
      </div>
      <div className="card-content">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a
          href={actionLink}
          className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-300"
        >
          {actionLabel} →
        </a>
      </div>
    </div>
  );
};

const HostAnOpportunity = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-semibold text-center mb-6">Host an Opportunity</h2>
      <p className="text-center text-lg mb-8">Choose your opportunity category from below</p>
      
      <div className="opportunity-categories">
        <h3 className="text-2xl font-semibold mb-6 text-center">For Engaging Your Target Audience</h3>
        <div className="category-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <OpportunityCard
            title="General & Case Competitions"
            description="Create Competitions"
            icon={<div className="icon competition bg-blue-500 p-4 rounded-full text-white">🏆</div>}
            actionLabel="Create Competitions"
            actionLink="/create-competitions"
          />
          <OpportunityCard
            title="Innovation Challenges"
            description="Create Challenges"
            icon={<div className="icon innovation bg-green-500 p-4 rounded-full text-white">💡</div>}
            actionLabel="Create Challenges"
            actionLink="/create-challenges"
          />
          <OpportunityCard
            title="Quizzes"
            description="Create Quizzes"
            icon={<div className="icon quizzes bg-purple-500 p-4 rounded-full text-white">📝</div>}
            actionLabel="Create Quizzes"
            actionLink="/create-quizzes"
          />
          <OpportunityCard
            title="Hackathons & Coding Challenges"
            description="Create Hackathons"
            icon={<div className="icon hackathons bg-red-500 p-4 rounded-full text-white">💻</div>}
            actionLabel="Create Hackathons"
            actionLink="/create-hackathons"
          />
          <OpportunityCard
            title="Webinars & Workshops"
            description="Create Workshops"
            icon={<div className="icon workshops bg-yellow-500 p-4 rounded-full text-white">🎥</div>}
            actionLabel="Create Workshops"
            actionLink="/create-workshops"
          />
        </div>
      </div>
    </div>
  );
};

export default HostAnOpportunity;
