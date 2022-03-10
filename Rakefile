require 'yaml'
require 'json'
require 'set'

GITHUB_CDN = 'https://raw.githubusercontent.com/HackerPen/tech-interview-questions'
GITHUB_BRANCH = 'main'

def coding_question_data(dir)
  raise "meta file does not exist for #{dir}" unless File.exists?("#{dir}/meta.yml")
  question_data = YAML.load(File.read("#{dir}/meta.yml"))

  validate_question_data(question_data)

  description = question_data["description"]
  description.each do |locale, file_path|
    description[locale] = "#{GITHUB_CDN}/#{GITHUB_BRANCH}/#{dir}/#{file_path}"
  end

  solution = question_data["solution"]
  solution.each do |locale, file_path|
    solution[locale] = "#{GITHUB_CDN}/#{GITHUB_BRANCH}/#{dir}/#{file_path}"
  end

  starter_code = question_data["starter_code"]
  starter_code.each do |lang, file_path|
    starter_code[lang] = "#{GITHUB_CDN}/#{GITHUB_BRANCH}/#{dir}/#{file_path}"
  end
  question_data["github_url"] = "https://github.com/HackerPen/tech-interview-questions/tree/main/coding/#{dir}"

  return question_data
end

def system_design_question_data(dir)
  raise "meta file does not exist for #{dir}" unless File.exists?("#{dir}/meta.yml")
  question_data = YAML.load(File.read("#{dir}/meta.yml"))

  validate_question_data(question_data)

  description = question_data["description"]
  description.each do |locale, file_path|
    description[locale] = "#{GITHUB_CDN}/#{GITHUB_BRANCH}/#{dir}/#{file_path}"
  end

  solution = question_data["solution"]
  solution.each do |locale, file_path|
    solution[locale] = "#{GITHUB_CDN}/#{GITHUB_BRANCH}/#{dir}/#{file_path}"
  end
  question_data["github_url"] = "https://github.com/HackerPen/tech-interview-questions/tree/main/coding/#{dir}"

  return question_data
end

def validate_question_data(data)
  # rule 1: difficulty must be one of ["easy", "medium", "hard"]
  unless ["easy", "medium", "hard"].include?(data["difficulty"])
    raise "In #{data['identifier']}, #{data['difficulty']} is not a valid difficulty, must be one of ['easy', 'medium', 'hard']"
  end
  # rule 2: category must be one of ["coding", "system_design"]
  unless ["coding", "system_design"].include?(data["category"])
    raise "In #{data['identifier']}, #{data['category']} is not a valid category, must be one of ['coding', 'system_design']"
  end

  # rule 3: en-locale description must be present
  unless data["description"].keys.include?("en")
    raise "In #{data['identifier']}, description items must include english solution"
  end
  # rule 4: en-locale solution must be present
  unless data["solution"].keys.include?("en")
    raise "In #{data['identifier']}, solution must include english solution"
  end

end

def check_identifier_uniqueness(questions)
  all_identifiers = Set.new
  for question in questions do
    q_id = question['identifier']
    if all_identifiers.include?(q_id)
      raise "duplicate identifiers detected: #{q_id}"
    end
      all_identifiers.add(q_id)
    end
end

desc "generate data from coding questions. DRY_RUN=true rake generate_coding_json"
task :generate_coding_json do
  data = {}
  dirs = Dir.glob("coding/**")
  coding_questions = dirs.map {|dir| coding_question_data(dir)}
  check_identifier_uniqueness(coding_questions)
  data[:questions] = coding_questions

  coding_json_file_path = "coding.json"
  if File.exists?(coding_json_file_path)
    previous_data = JSON.load(File.open(coding_json_file_path))
    data[:version] = previous_data["version"] + 1
  else
    data[:version] = 1
  end

  if ENV["DRY_RUN"]
    puts "❤️ coding.json to generate ❤️"
    puts data
  else
    # rewrite the file
    File.delete(coding_json_file_path) if File.exists?(coding_json_file_path)
    puts "❤️ new coding.json created ❤️"
    File.open(coding_json_file_path, "w") {|f| f.write(JSON.pretty_generate(data))}
  end

  # set GHA output
  puts "::set-output name=CODING_JSON_VERSION::#{data[:version]}"
end

desc "generate data from system design questions. DRY_RUN=true rake generate_system_design_json"
task :generate_system_design_json do
  data = {}
  dirs = Dir.glob("system_design/**")
  system_design_questions = dirs.map {|dir| system_design_question_data(dir)}
  check_identifier_uniqueness(system_design_questions)
  data[:questions] = system_design_questions

  system_design_json_file_path = "system_design.json"
  if File.exists?(system_design_json_file_path)
    previous_data = JSON.load(File.open(system_design_json_file_path))
    data[:version] = previous_data["version"] + 1
  else
    data[:version] = 1
  end

  if ENV["DRY_RUN"]
    puts "❤️ system_design.json to generate ❤️"
    puts data
  else
    # rewrite the file
    File.delete(system_design_json_file_path) if File.exists?(system_design_json_file_path)
    puts "❤️ new system_design.json created ❤️"
    File.open(system_design_json_file_path, "w") {|f| f.write(JSON.pretty_generate(data))}
  end

  # set GHA output
  puts "::set-output name=SYSTEM_DESIGN_JSON_VERSION::#{data[:version]}"
end
