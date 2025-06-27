export const DepartmentDescription = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mt-4">
      <div className="flex items-start">
        <div className="hidden md:block mr-4">
          <div className="bg-indigo-100 p-3 rounded-lg">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">About Establishment Department</h2>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              HR Management
            </span>
          </div>
          
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
              The Establishment department serves as the vital link between an organization's 
              management and its employees, specializing in comprehensive human resource management.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start">
                <svg className="flex-shrink-0 w-5 h-5 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Compliance with labor laws and employment standards</span>
              </div>
              
              <div className="flex items-start">
                <svg className="flex-shrink-0 w-5 h-5 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Administration of employee benefits</span>
              </div>
              
              <div className="flex items-start">
                <svg className="flex-shrink-0 w-5 h-5 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Employee records management and documentation</span>
              </div>
              
              <div className="flex items-start">
                <svg className="flex-shrink-0 w-5 h-5 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Employee onboarding and offboarding processes</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 italic mt-2">
              We ensure smooth organizational operations through effective people management.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
          Learn more
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};