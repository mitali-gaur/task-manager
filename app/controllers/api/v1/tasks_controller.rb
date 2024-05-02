# frozen_string_literal: true

# class to handle tasks related functionality
class Api::V1::TasksController < ApplicationController
  before_action :set_task, only: %i[update destroy]

  def index
    tasks = Task.order(created_at: :desc)
    render json: { success: true, data: get_tasks_response(tasks) }
  end

  def create
    task = Task.new(task_params)
    if task.save
      render json: { success: true, data: get_task_response(task) }
    else
      render json: { success: false, message: task.errors.full_messages.join(', ') }
    end
  end

  def update
    begin
      @task.update(update_task_status_params)
      render json: { success: true, data: get_task_response(@task) }
    rescue => e
      render json: { success: false, message: e.message }
    end
  end

  def destroy
    if @task.destroy
      render json: { success: true, message: 'Task Deleted' }
    else
      render json: { success: false, message: @task.errors.full_messages.join(', ') }
    end
  end

  private

  def get_task_response(task)
    ActiveModelSerializers::SerializableResource.new(task, serializer: TaskSerializer)
  end

  def get_tasks_response(tasks)
    ActiveModelSerializers::SerializableResource.new(tasks, each_serializer: TaskSerializer)
  end

  def task_params
    params.require(:task).permit(:title, :description, :status)
  end

  def update_task_status_params
    params.require(:task).permit(:status)
  end

  def set_task
    @task = Task.find_by(id: params[:id])
    return render json: { message: 'Task not found!' } unless @task
  end
end
