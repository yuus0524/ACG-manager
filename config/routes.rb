Rails.application.routes.draw do
  root to: redirect('/todos')

  get 'todos', to: 'site#index'
  get 'todos/anime', to: 'site#index'
  get 'todos/comic', to: 'site#index'
  get 'todos/game', to: 'site#index'
  get 'todos/new', to: 'site#index'
  get 'todos/:id/edit', to: 'site#index'

  namespace :api do
    namespace :v1 do
      delete '/todos/destroy_all', to: 'todos#destroy_all'
      resources :todos, only: %i[index show create update destroy] do
        collection do
          delete 'destroy_anime'
          delete 'destroy_comic'
          delete 'destroy_game'
        end
      end
    end
  end
end
