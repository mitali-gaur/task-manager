Rails.application.routes.draw do
  root 'home#index'

  get '/*path', to: 'home#index', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

  namespace :api do
    namespace :v1 do
      resources :tasks, except: %i[new edit]
    end
  end
end
