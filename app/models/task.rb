# frozen_string_literal: true

class Task < ApplicationRecord
  enum status: [:to_do, :in_progress, :done]

  validates :title, presence: true
  validate :check_to_do_tasks_availability, on: :create

  private

  def check_to_do_tasks_availability
    return unless status == 'to_do'
    return if Task.count.zero?

    # Do not allow creation of new "To Do" status task
    # if existing todo tasks are >= 50% of total tasks.
    is_task_available = Task.to_do.count < (Task.count / 2.to_f)
    errors.add(:base, 'To do tasks limit has reached') unless is_task_available
  end
end
