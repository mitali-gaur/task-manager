require 'rails_helper'

RSpec.describe "Tasks", type: :request do
  let!(:task) { create(:task, status: 'to_do') }
  let!(:header) { { "CONTENT_TYPE" => "application/json", "ACCEPT" => "application/json" } }

  describe "GET /api/v1/tasks" do
    let!(:tasks) { create_list(:task, 2, status: 'in_progress') }
    before { get "/api/v1/tasks", headers: header }

    it "fetches tasks successfully" do
      expected_response = {
        "success" => true,
        "data" => [
          {
            "id" => tasks.second.id,
            "title" => tasks.second.title,
            "description" => tasks.second.description,
            "status" => tasks.second.status
          },
          {
            "id" => tasks.first.id,
            "title" => tasks.first.title,
            "description" => tasks.first.description,
            "status" => tasks.first.status
          },
          {
            "id" => task.id,
            "title" => task.title,
            "description" => task.description,
            "status" => task.status
          }
        ]
      }

      expect(JSON.parse(response.body)).to eq(expected_response)
    end
  end

  describe "POST /api/v1/tasks" do
    context "with valid parameters" do
      let(:task_params) do
        {
          title: "Test task 1",
          description: "test description of task",
          status: 'in_progress'
        }
      end

      it "creates a new task" do
        expect {
          post "/api/v1/tasks", params: { task: task_params }
        }.to change(Task, :count).by(1)
      end
    end

    context "with invalid parameters" do
      context 'when title is invalid' do
        let(:task_params) do
          { title: "", description: "test description of task", status: 'in_progress' }
        end

        before { post "/api/v1/tasks", params: { task: task_params } }

        it "returns error" do
          expected_response = {
            "success" => false,
            "message" => "Title can't be blank"
          }

          expect(JSON.parse(response.body)).to eq(expected_response)
        end
      end

      context 'when to do status limit reached' do
        let(:task_params) do
          { title: "test", description: "test description of task" }
        end

        before { post "/api/v1/tasks", params: { task: task_params } }

        it "returns error" do
          expected_response = {
            "success" => false,
            "message" => "To do tasks limit has reached"
          }

          expect(JSON.parse(response.body)).to eq(expected_response)
        end
      end
    end
  end

  describe "PATCH /api/v1/tasks/:id" do
    context "with valid id" do
      let(:task_params) { { status: "in_progress" } }
      before { patch "/api/v1/tasks/1000", params: { task: task_params } }

      it "returns error" do
        expect(JSON.parse(response.body)).to eq({ "message" => 'Task not found!' })
      end
    end

    context "with valid parameters" do
      let(:task_params) { { status: "in_progress" } }

      it "updates the status of task" do
        expect {
          patch "/api/v1/tasks/#{task.id}", params: { task: task_params }
        }.to change{ task.reload.status }.from('to_do').to('in_progress')
      end
    end

    context "with invalid parameters" do
      let(:task_params) { { status: "test" } }

      before { patch "/api/v1/tasks/#{task.id}", params: { task: task_params } }

      it "returns error" do
        expected_response = {
          "success" => false,
          "message" => "'test' is not a valid status"
        }

        expect(JSON.parse(response.body)).to eq(expected_response)
      end
    end
  end

  describe "DELETE /api/v1/tasks/:id" do
    context "with valid parameters" do
      it "deletes the task" do
        expect {
          delete "/api/v1/tasks/#{task.id}"
        }.to change(Task, :count).by(-1)
      end
    end
  end
end
