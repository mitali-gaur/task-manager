# frozen_string_literal: true

# class to handle tasks related functionality
class Api::V1::TasksController < ApplicationController
  before_action :set_task, only: %i[update destroy]

  # GET /api/v1/tasks
  def index
    tasks = Task.order(created_at: :desc)
    render json: { success: true, data: get_tasks_response(tasks), status: :ok }
  end

  # POST /api/v1/tasks
  def create
    task = Task.new(task_params)
    if task.save
      render json: { success: true, data: get_task_response(task), status: :ok }
    else
      render json: { success: false, message: task.errors.full_messages.join(', '), status: :unprocessable_entity }
    end
  end

  # PATCH /api/v1/tasks/:id
  def update
    begin
      @task.update(update_task_status_params)
      render json: { success: true, data: get_task_response(@task), status: :ok }
    rescue => e
      render json: { success: false, message: e.message, status: :unprocessable_entity }
    end
  end

  # DELETE /api/v1/tasks/:id
  def destroy
    if @task.destroy
      render json: { success: true, message: 'Task Deleted', status: :ok }
    else
      render json: { success: false, message: @task.errors.full_messages.join(', '), status: :unprocessable_entity }
    end
  end

  private

  # get serialized response for task
  def get_task_response(task)
    ActiveModelSerializers::SerializableResource.new(task, serializer: TaskSerializer)
  end

  # get serialized response for tasks
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
    return render json: { message: 'Task not found!', status: :bad_request } unless @task
  end
end
