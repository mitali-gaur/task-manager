FactoryGirl.define do
  factory :task do
    title { 'test task' }
    description { 'test description' }
    status { 'to_do' }
  end
end
