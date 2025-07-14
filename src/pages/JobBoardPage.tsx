import React, { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Clock, DollarSign, Building2, Users, Filter, Briefcase } from "lucide-react";

// Extended job data with more details
const jobs = [
  {
    id: 1,
    titleKey: "jobBoardPage.jobs.registeredNurse.title",
    location: "Toronto, ON",
    typeKey: "jobBoardPage.jobs.registeredNurse.type",
    posted: "2024-06-01",
    salary: "$75,000 - $95,000",
    hospital: "Toronto General Hospital",
    department: "Emergency Department",
    experience: "2+ years",
    benefits: ["Health Insurance", "Pension", "Professional Development"],
    description: "Join our dynamic emergency department team providing exceptional patient care in a fast-paced environment."
  },
  {
    id: 2,
    titleKey: "jobBoardPage.jobs.medicalOfficeAssistant.title",
    location: "Toronto, ON",
    typeKey: "jobBoardPage.jobs.medicalOfficeAssistant.type",
    posted: "2024-05-28",
    salary: "$45,000 - $55,000",
    hospital: "Mount Sinai Hospital",
    department: "Outpatient Services",
    experience: "1+ years",
    benefits: ["Health Insurance", "Flexible Hours", "Training"],
    description: "Support our outpatient services team with administrative tasks and patient coordination."
  },
  {
    id: 3,
    titleKey: "jobBoardPage.jobs.residentPhysician.title",
    location: "London, ON",
    typeKey: "jobBoardPage.jobs.residentPhysician.type",
    posted: "2024-05-25",
    salary: "$65,000 - $85,000",
    hospital: "London Health Sciences Centre",
    department: "Internal Medicine",
    experience: "Residency Program",
    benefits: ["Health Insurance", "Educational Allowance", "Research Opportunities"],
    description: "Join our prestigious residency program in internal medicine with opportunities for research and specialization."
  },
  {
    id: 4,
    titleKey: "jobBoardPage.jobs.surgeon.title",
    location: "Vancouver, BC",
    typeKey: "jobBoardPage.jobs.surgeon.type",
    posted: "2024-05-20",
    salary: "$200,000 - $350,000",
    hospital: "Vancouver General Hospital",
    department: "Cardiovascular Surgery",
    experience: "5+ years",
    benefits: ["Health Insurance", "Malpractice Insurance", "Research Funding"],
    description: "Lead cardiovascular surgical procedures in our state-of-the-art facility."
  },
  {
    id: 5,
    titleKey: "jobBoardPage.jobs.pharmacist.title",
    location: "Montreal, QC",
    typeKey: "jobBoardPage.jobs.pharmacist.type",
    posted: "2024-05-18",
    salary: "$80,000 - $110,000",
    hospital: "Jewish General Hospital",
    department: "Pharmacy",
    experience: "3+ years",
    benefits: ["Health Insurance", "Professional Development", "Flexible Schedule"],
    description: "Provide pharmaceutical care and medication management in our hospital pharmacy."
  },
  {
    id: 6,
    titleKey: "jobBoardPage.jobs.radiologist.title",
    location: "Calgary, AB",
    typeKey: "jobBoardPage.jobs.radiologist.type",
    posted: "2024-05-15",
    salary: "$180,000 - $250,000",
    hospital: "Foothills Medical Centre",
    department: "Radiology",
    experience: "4+ years",
    benefits: ["Health Insurance", "Professional Development", "Technology Access"],
    description: "Interpret diagnostic imaging and provide expert radiological consultation."
  },
  {
    id: 7,
    titleKey: "jobBoardPage.jobs.physiotherapist.title",
    location: "Ottawa, ON",
    typeKey: "jobBoardPage.jobs.physiotherapist.type",
    posted: "2024-05-12",
    salary: "$70,000 - $90,000",
    hospital: "The Ottawa Hospital",
    department: "Rehabilitation Services",
    experience: "2+ years",
    benefits: ["Health Insurance", "Professional Development", "Work-Life Balance"],
    description: "Help patients recover mobility and function through specialized physical therapy programs."
  },
  {
    id: 8,
    titleKey: "jobBoardPage.jobs.labTechnician.title",
    location: "Halifax, NS",
    typeKey: "jobBoardPage.jobs.labTechnician.type",
    posted: "2024-05-10",
    salary: "$55,000 - $75,000",
    hospital: "Queen Elizabeth II Health Sciences Centre",
    department: "Laboratory Services",
    experience: "1+ years",
    benefits: ["Health Insurance", "Training", "Career Growth"],
    description: "Perform laboratory tests and maintain quality control in our diagnostic laboratory."
  }
];

const JobBoardPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [salaryFilter, setSalaryFilter] = useState("all");
  const [error, setError] = useState<string | null>(null);

  // Catch any initialization errors
  useEffect(() => {
    try {
      // Test if translations are working
      t('jobBoardPage.title');
    } catch (err) {
      console.error('Translation error:', err);
      setError('Failed to load translations. Please refresh the page.');
    }
  }, [t]);

  // Filter jobs based on search criteria
  const filteredJobs = useMemo(() => {
    try {
      return jobs.filter(job => {
        const jobTitle = t(job.titleKey) || job.titleKey;
        const jobType = t(job.typeKey) || job.typeKey;
        
        const matchesSearch = job.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             job.department.toLowerCase().includes(searchTerm.toLowerCase());
        
              const matchesLocation = !locationFilter || locationFilter === "all" || job.location.includes(locationFilter);
      const matchesType = !jobTypeFilter || jobTypeFilter === "all" || jobType === jobTypeFilter;
      const matchesSalary = !salaryFilter || salaryFilter === "all" || job.salary.includes(salaryFilter);

        return matchesSearch && matchesLocation && matchesType && matchesSalary;
      });
    } catch (error) {
      console.error('Error filtering jobs:', error);
      return jobs;
    }
  }, [searchTerm, locationFilter, jobTypeFilter, salaryFilter, t]);

  const uniqueLocations = useMemo(() => [...new Set(jobs.map(job => job.location))], []);
  const uniqueJobTypes = useMemo(() => {
    try {
      return [...new Set(jobs.map(job => t(job.typeKey) || job.typeKey))];
    } catch (error) {
      console.error('Error getting unique job types:', error);
      return [];
    }
  }, [t]);

  // Handle any errors
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Something went wrong</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Reload Page</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{t('jobBoardPage.title') || 'Job Board'}</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              {t('jobBoardPage.description') || 'Find the latest job opportunities in the medical and healthcare sector.'}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search jobs, hospitals, or departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-0 rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Filter className="h-5 w-5" />
                  {t('jobBoardPage.filterBy') || 'Filter by'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('jobBoardPage.location') || 'Location'}
                  </label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {uniqueLocations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Job Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('jobBoardPage.jobType') || 'Job Type'}
                  </label>
                  <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                    <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {uniqueJobTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Salary Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('jobBoardPage.salary') || 'Salary'}
                  </label>
                  <Select value={salaryFilter} onValueChange={setSalaryFilter}>
                    <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                      <SelectValue placeholder="All Salaries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Salaries</SelectItem>
                      <SelectItem value="$45,000">$45,000+</SelectItem>
                      <SelectItem value="$65,000">$65,000+</SelectItem>
                      <SelectItem value="$80,000">$80,000+</SelectItem>
                      <SelectItem value="$100,000">$100,000+</SelectItem>
                      <SelectItem value="$150,000">$150,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setLocationFilter("all");
                    setJobTypeFilter("all");
                    setSalaryFilter("all");
                  }}
                  className="w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 mt-6">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {jobs.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Active Positions
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
              </h2>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Sorted by most recent
              </div>
            </div>

            {filteredJobs.length === 0 ? (
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="pt-6 text-center">
                  <div className="text-gray-500 dark:text-gray-400 mb-4">
                    <Briefcase className="h-12 w-12 mx-auto mb-4" />
                    <p className="text-lg font-medium">{t('jobBoardPage.noJobsFound') || 'No jobs found matching your criteria.'}</p>
                    <p className="text-sm">Try adjusting your search criteria</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <Card key={job.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {t(job.titleKey)}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                                <div className="flex items-center gap-1">
                                  <Building2 className="h-4 w-4" />
                                  {job.hospital}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {job.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {t(job.typeKey)}
                                </div>
                              </div>
                            </div>
                            <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                              {job.department}
                            </Badge>
                          </div>

                          <p className="text-gray-700 dark:text-gray-300 mb-4">
                            {job.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                              <DollarSign className="h-4 w-4" />
                              {job.salary}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                              <Users className="h-4 w-4" />
                              {job.experience} experience
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.benefits.slice(0, 3).map((benefit, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {benefit}
                              </Badge>
                            ))}
                            {job.benefits.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{job.benefits.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 lg:items-end">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {t('jobBoardPage.posted') || 'Posted'} {job.posted}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                              {t('jobBoardPage.viewDetails') || 'View Details'}
                            </Button>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                              {t('jobBoardPage.applyNow') || 'Apply Now'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobBoardPage;
