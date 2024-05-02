class Task < ApplicationRecord
  enum status: [:to_do, :in_progress, :done]

  validates :title, presence: true
  validate :check_to_do_tasks_availability, on: :create

  private

  def check_to_do_tasks_availability
    return unless status == 'to_do'
    return if Task.count.zero?

    is_task_available = Task.to_do.count < (Task.count / 2.to_f)
    errors.add(:base, 'To do tasks limit has reached') unless is_task_available
  end
end
