require 'yaml'
require 'json'

GITHUB_CDN = 'https://raw.githubusercontent.com/HackerPen/tech-interview-questions'
GITHUB_BRANCH = 'main'

def coding_question_data(dir)
  raise "meta file does not exist for #{dir}" unless File.exists?("#{dir}/meta.yml")
	question_data = YAML.load(File.read("#{dir}/meta.yml"))

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

	return question_data
end

desc "generate data from coding questions. DRY_RUN=true rake generate_coding_json"
task :generate_coding_json do
  data = {}
  dirs = Dir.glob("coding/**")
  coding_questions = dirs.map {|dir| coding_question_data(dir)}
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
    File.open(coding_json_file_path, "w") {|f| f.write(data.to_json)}
  end

  # set GHA output
  puts "::set-output name=CODING_JSON_VERSION::#{data[:version]}"
end
