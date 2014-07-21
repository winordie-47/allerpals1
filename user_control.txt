class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user].permit(:first_name, :last_name, :email))

    if @user.save
      redirect_to @user
    else
      render 'new'
    end
  end
  def show
    @user = User.find(params[:id])
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if params.has_key?(:user)
      @user.update(params[:user].permit(:first_name, :last_name, :email))
      redirect_to @user
    else
      render 'edit'
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy

    redirect_to users_path
  end

  def index
    @user = User.all
  end

private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email)
  end
end
