import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-in">
            <i className="fas fa-info-circle text-white text-3xl"></i>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About SmartNoteVault</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your intelligent companion for organizing thoughts, ideas, and important information
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* What is SmartNoteVault */}
          <div className="card-modern p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                <i className="fas fa-lightbulb text-white text-xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What is SmartNoteVault?</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              SmartNoteVault is a modern, full-stack note-taking application designed to help you capture, 
              organize, and manage your thoughts efficiently. Built with cutting-edge technologies, it provides 
              a seamless experience across all your devices.
            </p>
          </div>

          {/* Key Features */}
          <div className="card-modern p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                <i className="fas fa-star text-white text-xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Key Features</h2>
            </div>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-2"></i>
                Secure user authentication
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-2"></i>
                Create, read, update, delete notes
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-2"></i>
                Organize with tags and categories
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-2"></i>
                Responsive modern design
              </li>
            </ul>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="card-modern p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-4">
              <i className="fas fa-code text-white text-xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Technology Stack</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <i className="fab fa-react text-blue-500 text-3xl mb-2"></i>
              <h3 className="font-semibold text-gray-900">React.js</h3>
              <p className="text-sm text-gray-600">Modern frontend framework</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <i className="fab fa-node-js text-green-500 text-3xl mb-2"></i>
              <h3 className="font-semibold text-gray-900">Node.js</h3>
              <p className="text-sm text-gray-600">Backend runtime environment</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <i className="fas fa-database text-green-600 text-3xl mb-2"></i>
              <h3 className="font-semibold text-gray-900">MongoDB</h3>
              <p className="text-sm text-gray-600">NoSQL database</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <i className="fab fa-js-square text-yellow-500 text-3xl mb-2"></i>
              <h3 className="font-semibold text-gray-900">Express.js</h3>
              <p className="text-sm text-gray-600">Web application framework</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <i className="fas fa-paint-brush text-purple-500 text-3xl mb-2"></i>
              <h3 className="font-semibold text-gray-900">Tailwind CSS</h3>
              <p className="text-sm text-gray-600">Utility-first CSS framework</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <i className="fas fa-shield-alt text-blue-600 text-3xl mb-2"></i>
              <h3 className="font-semibold text-gray-900">JWT Auth</h3>
              <p className="text-sm text-gray-600">Secure authentication</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="card-modern p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
              <i className="fas fa-envelope text-white text-xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Have questions, suggestions, or found a bug? We'd love to hear from you!
          </p>
          <a 
            href="mailto:udaysinghtohana9@gmail.com" 
            className="btn-gradient px-8 inline-flex items-center"
          >
            <i className="fas fa-paper-plane mr-2"></i>
            Contact Developer
          </a>
        </div>
      </div>
    </div>
  )
}

export default About
