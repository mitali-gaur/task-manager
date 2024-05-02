require 'rails_helper'

RSpec.describe Task, type: :model do
  subject { create(:task) }

  describe 'validations' do
    it { is_expected.to validate_presence_of(:title) }
  end

  describe '#check_to_do_tasks_availability' do
    let(:task) { build(:task) }

    before { create(:task) }

    it 'returns error message' do
      expect { task.save }.to change {
        task.errors.full_messages.join(', ')
      }.from('').to('To do tasks limit has reached')
    end
  end
end
