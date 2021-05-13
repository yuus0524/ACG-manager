class Api::V1::TodosController < ApplicationController
  def index
    todos = Todo.order(updated_at: :desc)
    render json: todos
  end

  def show
    todo = Todo.find(params[:id])
    render json: todo
  end

  def create
    todo = Todo.new(todo_params)
    if todo.save
      render json: todo
    else
      render json: todo.errors, status: 422
    end
  end

  def update
    todo = Todo.find(params[:id])
    if todo.update(todo_params)
      render json: todo
    else
      render json: todo.errors, status: 422
    end
  end

  def destroy
    if Todo.destroy(params[:id])
      head :no_content
    else
      render json: { error: "削除が失敗しました" }, status: 422
    end
  end

  def destroy_anime
    todo = Todo.where(category: "アニメ")
    if todo.destroy_all
      head :no_content
    else
      render json: { error: "削除が失敗しました" }, status: 422
    end
  end

  def destroy_comic
    todo = Todo.where(category: "マンガ")
    if todo.destroy_all
      head :no_content
    else
      render json: { error: "削除が失敗しました" }, status: 422
    end
  end

  def destroy_game
    todo = Todo.where(category: "ゲーム")
    if todo.destroy_all
      head :no_content
    else
      render json: { error: "削除が失敗しました" }, status: 422
    end
  end

  def destroy_all
    if Todo.destroy_all
      head :no_content
    else
      render json: { error: "削除が失敗しました" }, status: 422
    end
  end

  private

  def todo_params
    params.require(:todo).permit(:name, :is_completed, :category)
  end
end