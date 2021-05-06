class CreateTodos < ActiveRecord::Migration[6.0]
  def change
    create_table :todos do |t|
      t.string :name, null: false
      t.boolean :is_completed, default: false, null: false
      t.string :category, null: false

      t.timestamps
    end
  end
end
